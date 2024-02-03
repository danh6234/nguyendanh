<?php
namespace App\Http;

class BaseResponse{
    public $errorCode = 0;
    public $message = "";
    public $data = null;

    public static function whidthdata($data){
        $instance = new self();
        $instance-> data=$data;
         return (array)$instance;
    }
    public static function success($message){
        $instance = new self();
        $instance-> message=$message;
        $instance-> errorCode=0;
         return (array)$instance;
    }
    public static function error($error,$message){
        $instance = new self();
        $instance-> message=$message;
        $instance-> errorCode=$error;
         return (array)$instance;
    }
}