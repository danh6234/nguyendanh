<?php
namespace App\Http;

class BaseResult
{
    public $pagingInfo = null;
    public $data = null;
   


    public static function whithdata($data)
    {   
        $instance = new self();
        $instance-> data = $data;
        return (array)$instance;
    }
    public static function withPaging($pagingInfo, $data)
    {
        $instance = new self();
        $instance-> pagingInfo = $pagingInfo;
        $instance-> data = $data;
        return (array)$instance;
    }
   
}