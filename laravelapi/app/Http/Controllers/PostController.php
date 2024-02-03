<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Throwable;
use App\Http\BaseResponse;
use App\Models\PostModel;
use Illuminate\Http\Request;

class PostController extends Controller
{
    private $rules=[
        'Name'=>'required|min:5',
        'CreatedUser'=>'required',
        'ModifiedDate'=>'required',
        'ModifiedUser'=>'required',
    ];
    private $messages=[
        'Name.required'=>'Name is required.',
        'Name.min'=>'Name must at least 5 character.',
        'CreatedUser.required'=>'CreatedUser is required.',
        'ModifiedDate.required'=>'ModifiedDate is required.',
        'ModifiedUser.required'=>'ModifiedUser is required.',

    ];
    public function index($id=null){
        if($id==null){
            $data= PostModel::orderBy('id','asc')->get();
            return BaseResponse::whidthdata($data);
        }else{
            $data= PostModel::find($id);
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
                $data = new PostModel;
                $data->Name = $req->input('Name');
                $data->CategoryID = $req->input('CategoryID');
                $data->Image = $req->input('Image');
                $data->Description = $req->input('Description');
                $data->CreatedDate = $req->input('CreatedDate');
                $data->CreatedUser = $req->input('CreatedUser');
                $data->ModifiedDate = $req->input('ModifiedDate');
                $data->ModifiedUser = $req->input('ModifiedUser');
                $data->save();
                return BaseResponse::whidthdata($data);
            }catch(Throwable $e){
                return BaseResponse::error(500,$e->getMessage());
            }
        }
        
    }
    public function update($id, Request $req){
        $validadator=Validator::make($req->all(), $this->rules,$this->messages);
        if($validadator->fails()){
            return BaseResponse::error(400, $validadator->messages()->toJson());
        }else{
            $data=PostModel::find($id);
        if($data){
            try{
                $data->Name = $req->input('Name');
                $data->CategoryID = $req->input('CategoryID');
                $data->Image = $req->input('Image');
                $data->Description = $req->input('Description');
                $data->CreatedDate = $req->input('CreatedDate');
                $data->CreatedUser = $req->input('CreatedUser');
                $data->ModifiedDate = $req->input('ModifiedDate');
                $data->ModifiedUser = $req->input('ModifiedUser');
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
        $data=PostModel::find($id);
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
