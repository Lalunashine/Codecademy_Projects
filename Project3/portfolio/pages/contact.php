<?php 
    if(isset($_POST["submit"])) {
        $recipient = "shanye2015@gmail.com";
        $sender = $_POST["name"];
        $senderEmail = $_POST["email"];
        $subject = $_POST["subject"];
        $message = $_POST["message"];
        $mailBody = "Name: $sender \n Email: $senderEmail\n\n$message";
        mail($recipient, $subject, $mailBody, "From: $sender <$senderEmail>");
    }

?>