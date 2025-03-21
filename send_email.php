<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['first-name'];
    $lastName = $_POST['last-name'];
    $email = $_POST['email'];
    $company = $_POST['company'];
    $questions = $_POST['questions'];

    $to = "carlos.alvarez@ygrene.com";
    $subject = "Form Submission from Ygrene Updates Landing Page";
    $message = "First Name: $firstName\nLast Name: $lastName\nEmail: $email\nCompany: $company\nQuestions: $questions";
    $headers = "From: $email";

    if (mail($to, $subject, $message, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email.";
    }
}
?>
