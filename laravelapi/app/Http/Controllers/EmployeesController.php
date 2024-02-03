<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Throwable;
use App\Http\BaseResponse;
use App\Models\CartItemModel;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class EmployeesController extends Controller
{   private $rules=[
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
    private $rules2=[
        'Status'=>'required',
       
    ];
    private $messages2=[
        'Status.required'=>'Status is required.',
    ];
    public function update($id, Request $req){
        $validadator=Validator::make($req->all(), $this->rules,$this->messages);
        if($validadator->fails()){
            return BaseResponse::error(400, $validadator->messages()->toJson());
        }else{
            $employ = Employee::where('emp_id', $id)->first();
        if($employ){
            try{
                $employ->lastname = $req->input('lastname');
                $employ->firstname = $req->input('firstname');
                $employ->phone = $req->input('phone');
                $employ->email = $req->input('email');
                $employ->username = $req->username;
                $employ->password = bcrypt($req->password);
                $employ->save();

                if ($req->hasFile('image')) {
                    // check old image
                    if (!empty($employ->img)) {
                        if (File::exists(public_path('data/employee/').$employ->img))
                            File::delete(public_path('data/employee/').$employ->img);
                    }
                    
                    $filename = pathinfo($req->image->getClientOriginalName(), PATHINFO_FILENAME);
                    $imageName = $employ->emp_id . '_' . $filename . '_' . time() . '.' . $req->image->extension();
                    $req->image->move(public_path('data/employee'), $imageName);
                    // update DB
                    $employ->img = $imageName;
                    $employ->save();
                }
                return BaseResponse::whidthdata($employ);
            }catch(Throwable $e){
                return BaseResponse::error(500,$e->getMessage());
            }
        }else{
            return BaseResponse::error(404,'Data notfound!');
        }
        }
    }

    public function login(Request $req){
        $data=[
            'username'=>$req->username,
            'password'=>$req->password,];

        if(auth('employee')->attempt($data)) {
            $user = auth('employee')->user();
            $user->tokens()->delete();
            $token = $user->createToken('Apitoken')->plainTextToken;
            $authToken = explode('|', $token)[1];
            $data=[
                'id'=>$user->id, 
                'username'=>$user->username,
                'fullname'=>$user->name, 
                'token'=>$authToken
            ];
            return BaseResponse::whidthdata($data);
        } else {
            return BaseResponse::error(1, ' Wrong username or password !');
        }
        }
    public function profile(Request $request){
        $employ = $request -> user();
        $employ ->ImageUrl = "http://localhost:2000/laravelapi/public/data/employee/". $employ->img;
        return BaseResponse::whidthdata($employ);
    } 

    //Xử lý giỏ hàng
    public function indexCartItem($id=null){
        if($id==null){
            $data= CartItemModel::orderBy('id','asc')->get();
            return BaseResponse::whidthdata($data);
        }else{
            $data= CartItemModel::find($id);
            if($data){
              return BaseResponse::whidthdata($data);
            }else{
                return BaseResponse::error(404,'Data not found!');
            }
        }
    }
    public function updateCartItem($id, Request $req){
        $validadator=Validator::make($req->all(), $this->rules2,$this->messages2);
        if($validadator->fails()){
            return BaseResponse::error(400, $validadator->messages()->toJson());
        }else{
            $data=CartItemModel::find($id);
        if($data){
            try{
                $data->NameProduct = $req->input('NameProduct');
                $data->IdProduct = $req->input('IdProduct');
                $data->QualityProduct = $req->input('QualityProduct');
                $data->Status = $req->input('Status');
                $data->IdMember = $req->input('IdMember');
                $data->NameMember = $req->input('NameMember');
                $data->TotalPrice = $req->input('TotalPrice');
                $data->TransPort = $req->input('TransPort');
                $data->PriceSale = $req->input('PriceSale');
                $data->TotalPay = $req->input('TotalPay');
                $data->Phone = $req->input('Phone');
                $data->Address = $req->input('Address');
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
    public function deleteCartItem($id){
        $data = CartItemModel::find($id);
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
    //lọc giỏ hàng theo số Hóa đơn
    public function indexCartItemOder($idMember = null){
        $query = CartItemModel::query();
        if ($idMember) {
            $query->where('id', $idMember);
        }
        $data = $query->orderBy('id','asc')->get();
        return BaseResponse::whidthdata($data);
    }

}

