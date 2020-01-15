package com.hc.conifig;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.hc.basic.WxAccount;
import com.hc.common.utils.RedisUtil;
import com.hc.modules.user.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * @author ：fenghuang
 * @date ：Created in 2019/8/16 11:58
 * @description：
 * @modified By：
 * @version:
 */
@Component
public class JwtConfig {
    /**
     * JWT 自定义密钥
     */
    private static final String SECRET_KEY = "5371f568a45e5ab1f442c38e09232aef24447139b";
    /**
     * JWT 过期时间值 这里写死为和小程序时间一致 7200 秒，也就是两个小时
     */
    private static long expire_time = 7200;


    @Autowired
    private RedisUtil redisUtil;

    /**
     * 根据微信用户登陆信息创建 token
     * 注 : 这里的token会被缓存到redis中,用作为二次验证
     * redis里面缓存的时间应该和jwt token的过期时间设置相同
     *
     * @return 返回 jwt token
     */
    public String createToken(String remoteAddrIp)  {
        String jwtId = UUID.randomUUID().toString();   //JWT 随机ID,做为验证的key
        //1 . 加密算法进行签名得到token
        Algorithm algorithm = null;

        // 设置头部信息
        Map<String, Object> header = new HashMap<>(2);
        header.put("Type", "Jwt");
        header.put("alg", "HS256");

        try {
            algorithm = Algorithm.HMAC256(SECRET_KEY);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        String token = JWT.create()
                .withHeader(header)
                .withClaim("jwt-id", jwtId)
                .withClaim("remoteAddrIp", remoteAddrIp)
                .withExpiresAt(new Date(System.currentTimeMillis() + expire_time*1000)) //JWT 配置过期时间的正确姿势
                .sign(algorithm);
        //2 . Redis缓存JWT, 注 : 请和JWT过期时间一致
        redisUtil.set("JWT-SESSION-" + jwtId, token, expire_time);

        return token;
    }
    /**
     * 校验token是否正确
     * 1 . 根据token解密，解密出jwt-id , 先从redis中查找出redisToken，匹配是否相同
     * 2 . 然后再对redisToken进行解密，解密成功则 继续流程 和 进行token续期
     *
     * @param token 密钥
     * @return 返回是否校验通过
     */
    public boolean verifyToken(String token, String remoteAddrIp) {
        try {
            String jwtIdByToken = getJwtIdByToken(token);
            System.out.println("jwtIdByToken = " + jwtIdByToken);
            //1 . 根据token解密，解密出jwt-id , 先从redis中查找出redisToken，匹配是否相同
            String redisToken =  (String) redisUtil.get("JWT-SESSION-" + getJwtIdByToken(token));
            if (!redisToken.equals(token)) {
                return false;
            }
            //2 . 得到算法相同的JWTVerifier
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
            System.out.println("algorithm = " + algorithm);
            JWTVerifier verifier = JWT.require(algorithm).build();
            System.out.println("verifier = " + verifier);
            //3 . 验证token
            DecodedJWT verify = verifier.verify(redisToken);
            System.out.println("verify = " + verify);
            Map<String, Claim> claims = verify.getClaims();
            String remoteAddrIpJWT = claims.get("remoteAddrIp").asString();
            System.out.println("remoteAddrIpJWT = " + remoteAddrIpJWT);
            if(!remoteAddrIpJWT.equals(remoteAddrIp)){
                return false;
            }
            JWT.require(algorithm)
                    .withClaim("jwt-id", getJwtIdByToken(redisToken))
                    .withClaim("remoteAddrIp", remoteAddrIp)
                    .acceptExpiresAt(System.currentTimeMillis() + expire_time*1000 ) //JWT 正确的配置续期姿势
                    .build();
            //            //4 . Redis缓存JWT续期
            redisUtil.set("JWT-SESSION-" + getJwtIdByToken(token), redisToken, expire_time);

            return true;
        } catch (Exception e) { //捕捉到任何异常都视为校验失败
            System.out.println("e = " + e);
            return false;
        }
    }

    /**
     * 根据Token获取username(注意坑点 : 就算token不正确，也有可能解密出username,同下)
     */
    public String getRemoteAddrIpByToken(String token) throws JWTDecodeException {
        return JWT.decode(token).getClaim("remoteAddrIp").asString();
    }

    /**
     * 根据Token 获取jwt-id
     */
    private String getJwtIdByToken(String token) throws JWTDecodeException {
        System.out.println("token = " + token);
        return JWT.decode(token).getClaim("jwt-id").asString();
    }
}

