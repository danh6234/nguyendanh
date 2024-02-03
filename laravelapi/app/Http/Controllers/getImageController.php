<?php

namespace App\Http\Controllers;
use App\Http\BaseResponse;
use App\Models\Employee;
use App\Models\Member;
use App\Models\ProductModel;
use App\Models\ReportModel;

class getImageController extends Controller
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
    //getImg Employ
    public function getImgEmploy($id)
    {
        $data = Employee::find($id);
        if ($data) {
            if($data->img) {
                $imageUrl = url('/data/employee/'. $data->img);
            } else {
                $imageUrl = url('/data/employee/photo-icon.png');
            }
            return BaseResponse::whidthdata(['imageUrl' => $imageUrl]);
        } else {
            return BaseResponse::error(404, 'Data not found!');
        }
    }
    //getImg Member
    public function getImgMembers($id)
    {
        $data = Member::find($id);
        if ($data) {
            if($data->ImageUrl) {
                $imageUrl = url('/data/member/'. $data->ImageUrl);
            } else {
                $imageUrl = url('/data/member/photo-icon.png');
            }
            return BaseResponse::whidthdata(['imageUrl' => $imageUrl]);
        } else {
            return BaseResponse::error(404, 'Data not found!');
        }
    }
    //getImg report
    public function getImgReport($id)
    {
        $data = ReportModel::find($id);
        if ($data) {
            if($data->URL) {
                $imageUrl = url('/data/report/'. $data->URL);
            } else {
                $imageUrl = url('/data/report/download-icon.png');
            }
            return BaseResponse::whidthdata(['imageUrl' => $imageUrl]);
        } else {
            return BaseResponse::error(404, 'Data not found!');
        }
    }
}
