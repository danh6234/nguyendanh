<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Throwable;
use App\Http\BaseResponse;
use App\Models\ProductCategoryModel;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    private $rules=[
        'Name'=>'required|min:5',
        'CreatedDate'=>'required',
        'CreatedBy'=>'required',
        'MetaDescription'=>'required',
    ];
    private $messages=[
        'Name.required'=>'Name is required.',
        'Name.min'=>'Name must at least 5 character.',
        'CreatedDate.required'=>'CreatedDate is required.',
        'CreatedBy.required'=>'CreatedBy is required.',
        'MetaDescription.required'=>'MetaDescription is required.',

    ];
    public function index($id=null){
        if($id==null){
            $data= ProductCategoryModel::orderBy('Name','asc')->get();
            return BaseResponse::whidthdata($data);
        }else{
            $data= ProductCategoryModel::find($id);
            if($data){
              return BaseResponse::whidthdata($data);
            }else{
                return BaseResponse::error(404,'Data not found!');
            }
        }
    }
    public function create(Request $req){
        $validadator=Validator::make($req->all(), $this->rules,$this->messages);
        if($validadator->fails()){
            return BaseResponse::error(400, $validadator->messages()->toJson());
        }else{
            try{
                $data = new ProductCategoryModel;
                $data->ProductCategoryID = $req->input('ProductCategoryID');
                $data->Name = $req->input('Name');
                $data->Description = $req->input('Description');
                $data->DisplayOrder = $req->input('DisplayOrder');
                $data->Image = $req->input('Image');
                $data->CreatedDate = $req->input('CreatedDate');
                $data->CreatedBy = $req->input('CreatedBy');
                $data->MetaDescription = $req->input('MetaDescription');
                $data->Status = $req->input('Status');
                $data->save();
                return BaseResponse::whidthdata($data);
            }catch(Throwable $e){
                return BaseResponse::error(500,$e->getMessage());
            }
        }
        
    }
    public function update($id, Request $req){
        $validadator = Validator::make($req->all(), $this->rules,$this->messages);
        if($validadator->fails()){
            return BaseResponse::error(400, $validadator->messages()->toJson());
        }else{
            $data = ProductCategoryModel::find($id);
        if($data){
            try{
                $data->ProductCategoryID = $req->input('ProductCategoryID');
                $data->Name = $req->input('Name');
                $data->Description = $req->input('Description');
                $data->DisplayOrder = $req->input('DisplayOrder');
                $data->Image = $req->input('Image');
                $data->CreatedDate = $req->input('CreatedDate');
                $data->CreatedBy = $req->input('CreatedBy');
                $data->MetaDescription = $req->input('MetaDescription');
                $data->Status = $req->input('Status');
                $data->save();
                return BaseResponse::whidthdata($data);
            }catch(Throwable $e){
                return BaseResponse::error(500,$e->getMessage());
            }
        }else{
            return BaseResponse::error(404,'Data notfound!');
        }
        }
    }
    
    public function delete($id){
        $data=ProductCategoryModel::find($id);
        if($data){
            try{
                $data->delete();                
                return BaseResponse::whidthdata($data);
            }catch(Throwable $e){
                return BaseResponse::error(500,$e->getMessage());
            }
        }else{
            return BaseResponse::error(404,'Data notfound!');
        }
       
    }
}
