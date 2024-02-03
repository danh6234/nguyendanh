<?php

namespace App\Http\Controllers;
use App\Http\BaseResponse;
use App\Models\ProductModel;

class MemberGetImageController extends Controller
{
    //getImg Product
    public function index($id)
    {
        $data = ProductModel::find($id);
        if ($data) {
            if($data->ImageUrl) {
                $imageUrl = url('/data/product/'. $data->ImageUrl);
            } else {
                $imageUrl = url('/data/product/photo-icon.png');
            }
            return BaseResponse::whidthdata(['imageUrl' => $imageUrl]);
        } else {
            return BaseResponse::error(404, 'Data not found!');
        }
    }
}
