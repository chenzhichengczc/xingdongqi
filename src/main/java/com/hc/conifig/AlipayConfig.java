package com.hc.conifig;

import java.io.FileWriter;
import java.io.IOException;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class AlipayConfig {

//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

    // 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
    public static String app_id = "2021001107684815";

    // 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCdsKNDi46vEqXRAgWYS0WnlXpMjRd58nHYQQKoJpnq2sZFin6AzQxLXT3hH7JyHk9riHKyYrbU+NMoQYxxyq6+p7s5nzVfarTySsGIbv5ecrSEwRgOQXsGv16HCFaL/hxA8mO53klVUGmag35sTYg/64fildp2h7VvjCut+jnRbVhDmm/3Df2W+1/DuQoIW7HJ9lCsdgK11hNcLb+cAL8NAqul/K2t3YEbnTsNVYY7kBl/9AfxcnPXZVlGHCkyldJQLavtqEJbCeh8e5D9eP9LAzZZ25fkJPQD5LGhE2fOBejbrf+rFyRDuH3e9fe//OZDOt3K4yaCeP4uUL+pgNZlAgMBAAECggEAB0w6chDOXKnXRLH8Qk0Rfyz6yPoqoPkobaKslc2bh/PyAxviuOFEdWRuTbHi10cx078v17Ob1IVjeFR4RHfl2Gr4zjThCnZsw13UURUZ7pMOaapqC5baM7i9jjBDmRz8f8D3/o0cBbe/+2ekfSylZpfm5QScZKnpKq1pBBc1f8yl2pEE694yh7dEu1vNFc4/LJmCdKFqdB6zHetik2E/NthyQIdo4GCXjEP9rwoPkkh39RqU4KAMmAMOSZrmW3RvZq5fwEdhzFbqgOv0Ar+fywctYwE2OfonAExdG1wtHTlw3h48Z4dRtpnCpXL2zBHtckj0jjyLv6GZSg1b//08DQKBgQDrCCUIQvsgHYDq2snXxcopX4ATOEQRBbj1fcbW/N6sXu1BfeibkeFsdP2fj0Xy4p8LfCDisGo3fHtivs8LqiQc6tVqRwvrQBjTuG3lZ7ob9uO3DcJoxFVwWD6eQcvg+JmYlLsZdk/noY47qlJNObaT9GpL43TpztYJGUPVRoUV9wKBgQCrwhhZiG0lDqOGKPPisw1bRbAjG5Sw0dzdVMeYSbr25yuFQKs0ph2uHGg9+CHBZ0l9omBFpeb2NaL0BmYv0aQGqv9tEHF0wT5TJ5zTnjeKkGP/vwHeatCHbkFuTK+6CJwp02PJ802sZGzVTj80GgGoITPCVhOsBExdWgn0/gPvgwKBgHTvzXUJ1mZJJ54yEyDfENF66X8mjH8nqLnDxY2rrKJ4bHUcTwIwF8ddgd7EaxoIdPdC4B3Jhl9q+PzNULhOA7+7e0lwZda7Ql78sPjlnexR70RhfSuhG51U2nrk46pgJhOLVHe7rM/jSqAXAvHXWCbPAaAWYFIADe/i+SQA/TBLAoGARKVpd/c3sBTetFMPzm5Di1QZ5p4yWk02Gdu1fh8Rs3aHBVXoVz2BJUJDQ2k1jIfMboMEOTHqUkLzotYf50LBbMzRE3T78278it2NJ2LXzfCRlvhvNca5GzesvPm3TgH88BaFjoRIafslKEeCqT8vpFPIzQX8DMcXAkRnMFyJlCMCgYEAoCsqBAM+GfoAMyDuGeFvb5zQjb/258CXewOd4LtMJxnRg1ODM7aYrF4u3SSFfkcnEgfARawsLftn7fANn2yiTLQlVk8ql1wtfhS5Xhbw7mFo77qoAP5Te5d6yoVWPvlMOrnTDCiShFnW6duk2/xIqM52nI52ojQQKcNmvJ3y7jc=";

    // 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnbCjQ4uOrxKl0QIFmEtFp5V6TI0XefJx2EECqCaZ6trGRYp+gM0MS1094R+ych5Pa4hysmK21PjTKEGMccquvqe7OZ81X2q08krBiG7+XnK0hMEYDkF7Br9ehwhWi/4cQPJjud5JVVBpmoN+bE2IP+uH4pXadoe1b4wrrfo50W1YQ5pv9w39lvtfw7kKCFuxyfZQrHYCtdYTXC2/nAC/DQKrpfytrd2BG507DVWGO5AZf/QH8XJz12VZRhwpMpXSUC2r7ahCWwnofHuQ/Xj/SwM2WduX5CT0A+SxoRNnzgXo263/qxckQ7h93vX3v/zmQzrdyuMmgnj+LlC/qYDWZQIDAQAB";

    // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String notify_url = "https://www.xingdongqi.com/pay/alipay/notifyUrl";

    // 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String return_url = "https://www.xingdongqi.com/pay/alipay/notifyUrlPage";

    // 签名方式
    public static String sign_type = "RSA2";

    // 字符编码格式
    public static String charset = "utf-8";

    // 支付宝网关
    public static String gatewayUrl = "https://openapi.alipay.com/gateway.do";

    // 支付宝网关
    public static String log_path = "C:\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /**
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

