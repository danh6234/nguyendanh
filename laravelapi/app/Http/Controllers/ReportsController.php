<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Throwable;
use App\Http\BaseResponse;
use App\Http\BaseResult;
use App\Models\ReportModel;
use Illuminate\Http\Request;

class ReportsController extends Controller
{
    private $rules=[
        'Name'=>'required|min:2',    
        'Description'=>'required',
    ];
    private $messages=[
        'Name.required'=>'Name is required.',       
        'Name.min'=>'Last must at least 2 character.',
        'Description.required'=>'Description is required.',
        'Description.min'=>'Last must at least 2 character.',
    ];

    public function index($id = null){
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

    public function create(Request $req){
            $validadator=Validator::make($req->all(), $this->rules,$this->messages);
            if($validadator->fails()){
                return BaseResponse::error(400, $validadator->messages()->toJson());
            }else{
                try{
                    $data = new ReportModel;
                    $data->Name = $req->input('Name');
                    $data->Description = $req->input('Description');
                    $data->emp_id = $req->input('emp_id');
                    $data->NameMember = $req->input('NameMember');
                    $data->save();

                    if ($req->hasFile('image')) {
                        $filename = pathinfo($req->image->getClientOriginalName(), PATHINFO_FILENAME);
                        $imageName = $data->ID . '_' . $filename . '_' . time() . '.' . $req->image->extension();
                        $req->image->move(public_path('data/report'), $imageName);
                        // update DB
                        $data->URL = $imageName;
                        $data->save();
                    }
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
            $data = ReportModel::find($id);
        if($data){
                try{
                    $data->Name = $req->input('Name');
                    $data->Description = $req->input('Description');
                    $data->emp_id = $req->input('emp_id');
                    $data->NameMember = $req->input('NameMember');
                    $data->save();
                    
                    if ($req->hasFile('image')) {
                        // check old image
                        if (!empty($data->URL)) {
                            if (File::exists(public_path('data/report/').$data->URL))
                                File::delete(public_path('data/report/').$data->URL);
                        }
                        
                        $filename = pathinfo($req->image->getClientOriginalName(), PATHINFO_FILENAME);
                        $imageName = $data->ID . '_' . $filename . '_' . time() . '.' . $req->image->extension();
                        $req->image->move(public_path('data/report'), $imageName);
                        // update DB
                        $data->URL = $imageName;
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
   
    public function delete($id){
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

    // Phân trang theo Emp_id
    public function getPagingReportEmpid(Request $req, $empId = null) {
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
        $pagingQuery = ReportModel::orderBy($sortColumn, $sortDir);
        if (!empty($empId)) {
            $pagingQuery = $pagingQuery->where('emp_id', $empId);
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
                if ($item->URL) {
                    $item->URL = "http://localhost:2000/laravelapi/public/data/report/" . $item->URL;
                }
                return $item;
            });
            return BaseResult::whithdata($pagingData);
        }
    }
    
}
