<?php

namespace App\Http\Controllers;
use App\Http\BaseResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Member;

class MemberRegisterController extends Controller
{
    private $rules=[
        'lastname'=>'required|min:2',
        'firstname'=>'required',
        'email'=>'email'
    ];
    private $messages=[
        'lastname.required'=>'Lastname is required.',
        'lastname.min'=>'Last must at least 2 character.',
        'firstname.required'=>'Firstname is required.',
        'email.email'=>'Invalid email format.'
    ];


    public function register(Request $req){
        $validadator = Validator::make($req->all(), $this->rules,$this->messages);
        if($validadator->fails()){
            return BaseResponse::error(400, $validadator->messages()->toJson());
        }else{
            try{
                
                $data = new Member;
                $data->lastname = $req->input('lastname');
                $data->firstname = $req->input('firstname');
                $data->email = $req->input('email');
                $data->phone = $req->input('phone');
                $data->username = $req->input('username');
                $data->password = bcrypt($req->password);
                $data->save();

                if ($req->hasFile('image')) {
                    $filename = pathinfo($req->image->getClientOriginalName(), PATHINFO_FILENAME);
                    $imageName = $data->id . '_' . $filename . '_' . time() . '.' . $req->image->extension();
                    $req->image->move(public_path('data/member'), $imageName);
                    // update DB
                    $data->ImageUrl = $imageName;
                    $data->save();
                }
                return BaseResponse::whidthdata($data);
            }catch(\Exception $e){
                return BaseResponse::error(500,$e->getMessage());
            }
        }
        
    }


}
