<?php

namespace App\Http\Controllers;
use App\Http\BaseResponse;
use App\Http\BaseResult;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Member;
use App\Models\ProductModel;
use Illuminate\Support\Facades\File;
use App\Models\CodeforAllModel;
use Throwable;
use App\Models\CartItemModel;
use Illuminate\Support\Facades\DB;
class MembersController extends Controller
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

    public function update($id, Request $req){
        $validadator=Validator::make($req->all(), $this->rules,$this->messages);
        if($validadator->fails()){
            return BaseResponse::error(400, $validadator->messages()->toJson());
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

    public function register(Request $req){
        $validadator=Validator::make($req->all(), $this->rules,$this->messages);
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

    public function login(Request $req){
        $data=[
            'username'=>$req->username,
            'password'=>$req->password,];

        if(auth('member')->attempt($data)) {
            $user = auth('member')->user();
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
        $member = $request -> user();
        $member ->ImageUrl = "http://localhost:2000/laravelapi/public/data/member/". $member->ImageUrl;
        return BaseResponse::whidthdata($member);
    }
    //getproduct
    public function index($id=null){
        if($id==null) {
            $data= ProductModel::orderBy('ID', 'asc')->get();
            $data = $data->map(function ($item) {
                if($item->ImageUrl) {
                    $item->ImageUrl = "http://localhost:2000/laravelapi/public/data/product". $item->ImageUrl;
                }
                return $item;
            });
            return BaseResponse::whidthdata($data);
        } else {
            $data= ProductModel::find($id);
            if($data) {
                if($data->ImageUrl) {
                    $data->ImageUrl = "http://localhost:2000/laravelapi/public/data/product/". $data->ImageUrl;
                }
                return BaseResponse::whidthdata($data);
            } else {
                return BaseResponse::error(404, 'Data not found!');
            }
        }
    }

   //phân trang theo loại sản phẩm
    public function getPagingProductCtegory(Request $req, $categoryId = null) {
        // for paging
        $pageNum = intval($req->query('p', '0'));
        $pageLength =  intval($req->query('r', '10'));
        // for sorting
        $sort = $req->query('s', '');
        $sortColumn = 'Name';
        $sortDir = 'asc';
        if (!empty($sort)) {
            $sortColumns = explode(',', $sort);
            $sortColumn = $sortColumns[0];
            if (count($sortColumns)>1) {
                $sortDir = $sortColumns[1];
            }
        }
        // create query
        $pagingQuery = ProductModel::orderBy($sortColumn, $sortDir);
        if (!empty($categoryId)) {
            $pagingQuery = $pagingQuery->where('ProductCategoryID', $categoryId);
        }
        $q = $req->query('q', '');
        if (!empty($q)) {
            $pagingQuery = $pagingQuery->where(function ($query) use ($q) {
                $query->where('Name', 'LIKE', "%$q%")
                    ->orWhere('Color', 'LIKE', "%$q%")
                    ->orWhere(DB::raw("CONCAT(Name,' ',Color)"), 'LIKE', "%$q%")
                    ->orWhere('Price', 'LIKE', "%$q%")
                    ->orWhere('Madeln', 'LIKE', "%$q%");
            });
        }
        $data = $pagingQuery->get();

        if ($pageLength > 0) {
            $pagingData = $data->forPage($pageNum + 1, $pageLength)->values();
        } else {
            $pagingData = $data;
        }
        if ($pageLength > 0) {
            $pagingInfo = [
                'page' => $pageNum,
                'pageLength' => $pageLength,
                'totalRecords' => $data->count(),
                'totalPages' => ceil($data->count()/$pageLength),
            ];
            return BaseResult::withPaging($pagingInfo, $pagingData);
        } else {    
            $pagingData = $data->map(function ($item) {
                if ($item->ImageUrl) {
                    $item->ImageUrl = "http://localhost:2000/laravelapi/public/data/product/" . $item->ImageUrl;
                }
                return $item;
            });
            return BaseResult::whithdata($pagingData);
        }
    }
    //getCodeAll
    public function indexCodeAll($id=null){
        if($id==null){
            $data= CodeforAllModel::orderBy('id','asc')->get();
            return BaseResponse::whidthdata($data);
        }else{
            $data= CodeforAllModel::find($id);
            if($data){
              return BaseResponse::whidthdata($data);
            }else{
                return BaseResponse::error(404,'Data not found!');
            }
        }
    }

     //Xử lý giỏ hàng
     public function indexCartItem($idMember = null){
        $query = CartItemModel::query();
        if ($idMember) {
            $query->where('idMember', $idMember);
        }
        $data = $query->orderBy('id','asc')->get();
        return BaseResponse::whidthdata($data);
    }
}
