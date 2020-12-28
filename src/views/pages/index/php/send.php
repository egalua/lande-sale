<?php 
    // Работает при наличии mail()
    // if(isset($_POST['submit'])){
    // $to = "vizard_@mail.ru";
    // $subject = "Письмо с сайта";
    // $charset = "utf-8";
    // $headerss = "Content-type: text/html; charset=$charset\r\n";
    // $headerss.="MIME-Version: 1.0\r\n";
    // $headerss.="Date: ".date('D, d M Y h:i:s O')."\r\n";
    // $msg = "Имя: ".$_POST["username"]."; ";
    // $msg .= "Email: ".$_POST["email-address"]."; \r\n";
    // mail($to, $subject, $msg, $headerss);
    // }

    // Файлы phpmailer
    require 'PHPMailer.php';
    require 'SMTP.php';
    require 'Exception.php';

    // Переменные, которые отправляет пользователь
    $name = $_POST['username'];
    $email = $_POST['email-address'];
    // $text = $_POST['text'];
    $file = $_FILES['myfile'];

    // Формирование самого письма
    $title = "Заявка от клиента с сайта по продаже участка";
    $body = "
    <h2>Заявка</h2>
    <b>Имя:</b> $name<br>
    <b>Почта:</b> $email<br><br>
    <b>Сообщение:</b><br> текст (в будущем, возможно, сообщение пользователя)
    ";

    // Настройки PHPMailer
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    try {
        $mail->isSMTP();   
        $mail->CharSet = "UTF-8";
        $mail->SMTPAuth   = true;
        //$mail->SMTPDebug = 2;
        $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

        // Настройки вашей почты
        $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
        $mail->Username   = '____@yandex.ru'; // Логин на почте
        $mail->Password   = '____'; // Пароль на почте
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;
        $mail->setFrom('____@yandex.ru', 'Landing - продажа земли'); // Адрес самой почты и имя отправителя

        // Получатель письма
        $mail->addAddress('____@mail.ru');  
        $mail->addAddress('____@yandex.ru'); // Ещё один, если нужен

        // Прикрипление файлов к письму
    if (!empty($file['name'][0])) {
        for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
            $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
            $filename = $file['name'][$ct];
            if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
                $mail->addAttachment($uploadfile, $filename);
                $rfile[] = "Файл $filename прикреплён";
            } else {
                $rfile[] = "Не удалось прикрепить файл $filename";
            }
        }   
    }
    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;    

    // Проверяем отравленность сообщения
    if ($mail->send()) {$result = "success";} 
    else {$result = "error";}

    } catch (Exception $e) {
        $result = "error";
        $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
    }

    // Отображение результата
    echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);

?>