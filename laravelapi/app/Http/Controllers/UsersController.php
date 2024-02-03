<?php
namespace App\Http\Controllers;
use App\Http\BaseResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Throwable;
use App\Models\ReportModel;
use App\Models\PostModel;
use App\Models\Member;
use App\Models\OderDetailModel;
use App\Models\OderModel;
use App\Models\Employee;
use Illuminate\Support\Facades\File;

class UsersController extends Controller
{   private $rules=[
    'thoigian'=>'required',         
    'linktaibaocao'=>'required',

    'lastname'=>'required|min:2',    
    'firstname'=>'required',
    'email'=>'email',
];
    private $rules2=[
        'lastname'=>'required|min:2',    
        'firstname'=>'required',
        'email'=>'email',
    ];
    private $messages=[
    'thoigian.required'=>'thoigian is required.',           
    'linktaibaocao.required'=>'linktaibaocao is required.',
    ];
    private $messages2=[
        'lastname.required'=>'Lastname is required.',       
        'lastname.min'=>'Last must at least 2 character.',
        'firstname.required'=>'Firstname is required.',
        'email.email'=>'Invalid email format.',
        ];
    private $rules3=[
        'Name'=>'required|min:2',    
        'Description'=>'required',
        ];
    private $messages3=[
        'Name.required'=>'Lastname is required.',       
        'Name.min'=>'Last must at least 2 character.',
        'Description.required'=>'Firstname is required.',
        'Description.min'=>'Last must at least 2 character.',
        ];
    
    //Đăng nhập
    public function login(Request $req){
        $rules = [ 
            "username" => "required",
            "password" => "required"];
        $messages=[
            "username.required" => "Username is requires.",
            "password.required" => "Password is requires.",
        ];
        $validadator=Validator::make($req->all(),$rules,$messages);
        if($validadator->fails()) {
            return BaseResponse::error(400, $validadator->messages()->toJson());
        } else {
            $data=['username'=>$req->username, 'password'=>$req->password];
            if(auth()->attempt($data)) {
                $user = auth()->user();
                $token= hash('sha256', time(). Str::random(60));
                $user->forceFill(['api_token' => $token])->save();

                $data=[
                    'id' => $user->id, 
                    'username' => $user->username, 
                    'fullName' => $user->name, 
                    'token' => $token
                ];
                return BaseResponse::whidthdata($data);
            } else {
                return BaseResponse::error(1, ' Wrong username or password !');
            }
            }
    } 
    
    //Bài viết
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
        if($data) {
            try {
                $data->delete();
                return BaseResponse::whidthdata($data);
            } catch(Throwable $e) {
                return BaseResponse::error(500, $e->getMessage());
            }
        } else {
            return BaseResponse::error(404, 'Data notfound!');
        }
    }
    
    //employees
    public function indexEmploy($id=null){
        if($id==null) {
            $data= Employee::orderBy('emp_id', 'asc')->get();
            $data = $data->map(function ($item) {
                if($item->img) {
                    $item->img = "http://localhost:2000/laravelapi/public/". $item->img;
                }
                return $item;
            });
            return BaseResponse::whidthdata($data);
        } else {
            $data= Employee::find($id);
            if($data) {
                if($data->img) {
                    $data->img = "http://localhost:2000/laravelapi/public/". $data->img;
                }
                return BaseResponse::whidthdata($data);
            } else {
                return BaseResponse::error(404, 'Data not found!');
            }
        }
    }
    public function createEmploy(Request $req){
        $validadator=Validator::make($req->all(), $this->rules2,$this->messages2);
        if($validadator->fails()){
            return BaseResponse::error(400, $validadator->messages2()->toJson());
        }else{
            try{
                $data = new Employee;
                $data->lastname = $req->input('lastname');
                $data->firstname = $req->input('firstname');
                $data->phone = $req->input('phone');
                $data->email = $req->input('email');
                $data->username = $req->input('username');
                $data->password = bcrypt($req->password);
                $data->save();
                
                if ($req->hasFile('image')) {
                    $filename = pathinfo($req->image->getClientOriginalName(), PATHINFO_FILENAME);
                    $imageName = $data->emp_id . '_' . $filename . '_' . time() . '.' . $req->image->extension();
                    $req->image->move(public_path('data/employee'), $imageName);
                    // update DB
                    $data->img = $imageName;
                    $data->save();
                }
                return BaseResponse::whidthdata($data);
            }catch(Throwable $e){
                return BaseResponse::error(500,$e->getMessage());
            }
        }
        
    }
    public function updateEmploy($id, Request $req){
        $validadator=Validator::make($req->all(), $this->rules2,$this->messages2);
        if($validadator->fails()){
            return BaseResponse::error(400, $validadator->messages2()->toJson());
        }else{
            $data = Employee::where('emp_id', $id)->first();
        if($data){
            try{
                $data->lastname = $req->input('lastname');
                $data->firstname = $req->input('firstname');
                $data->phone = $req->input('phone');
                $data->email = $req->input('email');
                $data->username = $req->input('username');
                $data->password = bcrypt($req->password);
                $data->save();
                
                if ($req->hasFile('image')) {
                    // check old image
                    if (!empty($data->img)) {
                        if (File::exists(public_path('data/employee/').$data->img))
                            File::delete(public_path('data/employee/').$data->img);
                    }
                    
                    $filename = pathinfo($req->image->getClientOriginalName(), PATHINFO_FILENAME);
                    $imageName = $data->emp_id . '_' . $filename . '_' . time() . '.' . $req->image->extension();
                    $req->image->move(public_path('data/employee'), $imageName);
                    // update DB
                    $data->img = $imageName;
                    $data->save();
                }
                return BaseResponse::whidthdata($data);
            }catch(Throwable $e){
                return BaseResponse::error(500,$e->getMessage());
            }
        }else{
            return BaseResponse::error(404,'Data notfound!');
        }
        }
    }

    public function deleteEmploy($id){
        $data = Employee::where('emp_id', $id)->first();
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
    
    //Khách hàng 
    public function indexMember($id = null){
        if($id == null) {
            $data = Member::orderBy('id', 'asc')->get();
            $data = $data->map(function ($item) {
                if($item->ImageUrl) {
                    $item->ImageUrl = "http://localhost:2000/laravelapi/public/". $item->ImageUrl;
                }
                return $item;
            });
            return BaseResponse::whidthdata($data);
        } else {
            $data = Member::find($id);
            if($data) {
                if($data->ImageUrl) {
                    $data->ImageUrl = "http://localhost:2000/laravelapi/public/". $data->ImageUrl;
                }
                if($data) {
                    return BaseResponse::whidthdata($data);
                } else {
                    return BaseResponse::error(404, 'Data not found!');
                }
            }
        }
    }
    public function createMember(Request $req){
            $validadator=Validator::make($req->all(), $this->rules2,$this->messages2);
            if($validadator->fails()){
                return BaseResponse::error(400, $validadator->messages2()->toJson());
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
                }catch(Throwable $e){
                    return BaseResponse::error(500,$e->getMessage());
                }
            }  
    }
    public function updateMember($id, Request $req){
        $validadator=Validator::make($req->all(), $this->rules2,$this->messages2);
        if($validadator->fails()){
            return BaseResponse::error(400, $validadator->messages2()->toJson());
        }else{
            $data = Member::find($id);
        if($data){
                try{
                    $data->lastname = $req->input('lastname');
                    $data->firstname = $req->input('firstname');
                    $data->email = $req->input('email');
                    $data->phone = $req->input('phone');
                    $data->username = $req->input('username');
                    $data->password = bcrypt($req->password);
                    $data->save();
                    
                    if ($req->hasFile('image')) {
                        // check old image
                        if (!empty($data->ImageUrl)) {
                            if (File::exists(public_path('data/member/').$data->ImageUrl))
                                File::delete(public_path('data/member/').$data->ImageUrl);
                        }
                        
                        $filename = pathinfo($req->image->getClientOriginalName(), PATHINFO_FILENAME);
                        $imageName = $data->id . '_' . $filename . '_' . time() . '.' . $req->image->extension();
                        $req->image->move(public_path('data/member'), $imageName);
                        // update DB
                        $data->ImageUrl = $imageName;
                        $data->save();
                    }
                    return BaseResponse::whidthdata($data);
                }catch(Throwable $e){
                    return BaseResponse::error(500,$e->getMessage());
                }
            }else{
                return BaseResponse::error(404,'Data notfound!');
            }
            }
        }

    public function deleteMember($id){
        $data = Member::where('id', $id)->first();
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


    // báo cáo

    public function indexReport($id = null){
        if($id == null) {
            $data = ReportModel::orderBy('ID', 'asc')->get();
            $data = $data->map(function ($item) {
                if($item->URL) {
                    $item->ImageUrl = "http://localhost:2000/laravelapi/public/". $item->URL;
                }
                return $item;
            });
            return BaseResponse::whidthdata($data);
        } else {
            $data = ReportModel::find($id);
            if($data) {
                if($data->URL) {
                    $data->URL = "http://localhost:2000/laravelapi/public/". $data->URL;
                }
                if($data) {
                    return BaseResponse::whidthdata($data);
                } else {
                    return BaseResponse::error(404, 'Data not found!');
                }
            }
        }
    }
     
    public function deleteReport($id){
        $data=ReportModel::find($id);
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

    //Oderdtail

    public function indexOderdetail($id=null){
        if($id==null){
            $data= OderDetailModel::orderBy('id','asc')->get();
            return BaseResponse::whidthdata($data);
        }else{
            $data= OderDetailModel::find($id);
            if($data){
              return BaseResponse::whidthdata($data);
            }else{
                return BaseResponse::error(404,'Data not found!');
            }
        }
    }


    public function clearOrderDetail()
    {
        try {
            $data = OderDetailModel::query()->delete();
            if ($data) {
                return BaseResponse::withData($data);
            } else {
                return BaseResponse::error(404, 'Data not found!');
            }
        } catch (\Throwable $e) {
            return BaseResponse::error(500, $e->getMessage());
        }
    }

     //Oder

     public function indexOder($id=null){
        if($id==null){
            $data= OderModel::orderBy('ID','asc')->get();
            return BaseResponse::whidthdata($data);
        }else{
            $data= OderModel::find($id);
            if($data){
              return BaseResponse::whidthdata($data);
            }else{
                return BaseResponse::error(404,'Data not found!');
            }
        }
    }


    public function clearOrder()
    {
        try {
            $data = OderModel::query()->delete();
            if ($data) {
                return BaseResponse::withData($data);
            } else {
                return BaseResponse::error(404, 'Data not found!');
            }
        } catch (\Throwable $e) {
            return BaseResponse::error(500, $e->getMessage());
        }
    }


}




