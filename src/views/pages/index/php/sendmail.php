<?php 
    if(isset($_POST['submit'])){
    $to = "vizard_@mail.ru";
    $subject = "Письмо с сайта";
    $charset = "utf-8";
    $headerss = "Content-type: text/html; charset=$charset\r\n";
    $headerss.="MIME-Version: 1.0\r\n";
    $headerss.="Date: ".date('D, d M Y h:i:s O')."\r\n";
    $msg = "Имя: ".$_POST["username"]."; ";
    $msg .= "Email: ".$_POST["email-address"]."; \r\n";
    mail($to, $subject, $msg, $headerss);
    }
?>