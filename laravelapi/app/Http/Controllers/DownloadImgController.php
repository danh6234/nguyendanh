<?php

namespace App\Http\Controllers;
use App\Models\ProductModel;
use App\Models\ReportModel;
use Zip;
class DownloadImgController extends Controller
{
    //dowloadImg product
    public function downloaddImgProduct($id)
    {
        $row = ProductModel::find($id);
        if ($row && !empty($row->ImageUrl)) {
            $zip = Zip::create("package.zip")->add(public_path('data/product/' .$row->ImageUrl));
            return $zip;
        }
    }
    //download Report
    public function downloaddImgReport($id)
    {
        $row = ReportModel::find($id);
        if ($row && !empty($row->URL)) {
            $zip = Zip::create("package.zip")->add(public_path('data/report/' .$row->URL));
            return $zip;
        }
    }
}
