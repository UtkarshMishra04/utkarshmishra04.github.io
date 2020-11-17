<?php
 
if($_POST) {
    $fname = "";
    $fname = "";
    $email = "";
    $subject = "";
    $message = "";
     
    if(isset($_POST['fname'])) {
        $fname = filter_var($_POST['fname'], FILTER_SANITIZE_STRING);
    }

    if(isset($_POST['lname'])) {
        $lname = filter_var($_POST['lname'], FILTER_SANITIZE_STRING);
    }
     
    if(isset($_POST['email'])) {
        $email = str_replace(array("\r", "\n", "%0a", "%0d"), '', $_POST['email']);
        $email = filter_var($visitor_email, FILTER_VALIDATE_EMAIL);
    }

    if(isset($_POST['subject'])) {
        $subject = htmlspecialchars($_POST['subject']);
    }
     
    if(isset($_POST['message'])) {
        $message = htmlspecialchars($_POST['message']);
    }
     
    
    $recipient = "umishra@me.iitr.ac.in";
    
     
    $headers  = 'MIME-Version: 1.0' . "\r\n"
    .'Content-type: text/html; charset=utf-8' . "\r\n"
    .'From: ' . $email . "\r\n";
     
    if(mail($recipient, $subject, $message, $headers)) {
        echo "<p>Thank you for contacting us, $visitor_name. You will get a reply as soon as possible.</p>";
    } else {
        echo '<p>We are sorry but the email did not go through.</p>';
    }
     
} else {
    echo '<p>Something went wrong</p>';
}
 
?>