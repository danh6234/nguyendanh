<?php

namespace App\Http\Controllers;
use App\Http\BaseResult;
use App\Models\Employee;
use App\Models\Member;
use App\Models\ProductModel;
use App\Models\ProductCategoryModel;
use App\Models\ReportModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\CartItemModel;

class GetPagingController extends Controller
{
    //phân trang Product
    public function getPagingProduct(Request $req) {
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
        $pagingQuery = ProductModel::orderBy($sortColumn, $sortDir);
        // for search
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
            return BaseResult::whithdata($pagingData);
        }           
    }
    //Phân trang loại sản phẩm
    public function getPagingProductCategory(Request $req) {
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
        $pagingQuery = ProductCategoryModel::orderBy($sortColumn, $sortDir);
        // for search
        $q = $req->query('q', '');
        if (!empty($q)) {
            $pagingQuery = $pagingQuery->where(function ($query) use ($q) {
                $query->where('Name', 'LIKE', "%$q%")
                    ->orWhere('Description', 'LIKE', "%$q%")
                    ->orWhere(DB::raw("CONCAT(Name,' ',Description)"), 'LIKE', "%$q%")
                    ->orWhere('CreatedDate', 'LIKE', "%$q%")
                    ->orWhere('Status', 'LIKE', "%$q%");
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
            return BaseResult::whithdata($pagingData);
        }           
    }


    // Phân trang employees
    public function getPagingEmployee(Request $req) {
        // for paging
        $pageNum = intval($req->query('p', '0'));
        $pageLength =  intval($req->query('r', '10'));
        // for sorting
        $sort = $req->query('s', '');
        $sortColumn = 'emp_id';
        $sortDir = 'asc';
        if (!empty($sort)) {
            $sortColumns = explode(',', $sort);
            $sortColumn = $sortColumns[0];
            if (count($sortColumns)>1) {
                $sortDir = $sortColumns[1];
            }
        }
        $pagingQuery = Employee::orderBy($sortColumn, $sortDir);
        // for search
        $q = $req->query('q', '');
        if (!empty($q)) {
            $pagingQuery = $pagingQuery->where(function ($query) use ($q) {
                $query->where('lastname', 'LIKE', "%$q%")
                    ->orWhere('username', 'LIKE', "%$q%")
                    ->orWhere(DB::raw("CONCAT(lastname,' ',username)"), 'LIKE', "%$q%");            
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
            return BaseResult::whithdata($pagingData);
        }           
    }

    //phân trang member
    public function getPagingMember(Request $req) {
        // for paging
        $pageNum = intval($req->query('p', '0'));
        $pageLength =  intval($req->query('r', '10'));
        // for sorting
        $sort = $req->query('s', '');
        $sortColumn = 'id';
        $sortDir = 'asc';
        if (!empty($sort)) {
            $sortColumns = explode(',', $sort);
            $sortColumn = $sortColumns[0];
            if (count($sortColumns)>1) {
                $sortDir = $sortColumns[1];
            }
        }
        $pagingQuery = Member::orderBy($sortColumn, $sortDir);
        // for search
        $q = $req->query('q', '');
        if (!empty($q)) {
            $pagingQuery = $pagingQuery->where(function ($query) use ($q) {
                $query->where('lastname', 'LIKE', "%$q%")
                    ->orWhere('username', 'LIKE', "%$q%")
                    ->orWhere(DB::raw("CONCAT(lastname,' ',username)"), 'LIKE', "%$q%");            
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
            return BaseResult::whithdata($pagingData);
        }           
    }

    //phân trang Report
    public function getPagingReport(Request $req) {
        // for paging
        $pageNum = intval($req->query('p', '0'));
        $pageLength =  intval($req->query('r', '10'));
        // for sorting
        $sort = $req->query('s', '');
        $sortColumn = 'ID';
        $sortDir = 'asc';
        if (!empty($sort)) {
            $sortColumns = explode(',', $sort);
            $sortColumn = $sortColumns[0];
            if (count($sortColumns)>1) {
                $sortDir = $sortColumns[1];
            }
        }
        $pagingQuery = ReportModel::orderBy($sortColumn, $sortDir);
        // for search
        $q = $req->query('q', '');
        if (!empty($q)) {
            $pagingQuery = $pagingQuery->where(function ($query) use ($q) {
                $query->where('Name', 'LIKE', "%$q%")
                    ->orWhere('Description', 'LIKE', "%$q%")
                    ->orWhere(DB::raw("CONCAT(Name,' ',Description)"), 'LIKE', "%$q%");            
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
            return BaseResult::whithdata($pagingData);
        }           
    }

    //phân trang xử lý giỏ hàng
    public function getPagingCartitem(Request $req) {
        // for paging
        $pageNum = intval($req->query('p', '0'));
        $pageLength =  intval($req->query('r', '10'));
        // for sorting
        $sort = $req->query('s', '');
        $sortColumn = 'id';
        $sortDir = 'asc';
        if (!empty($sort)) {
            $sortColumns = explode(',', $sort);
            $sortColumn = $sortColumns[0];
            if (count($sortColumns)>1) {
                $sortDir = $sortColumns[1];
            }
        }
        $pagingQuery = CartItemModel::orderBy($sortColumn, $sortDir);
        // for search
        $q = $req->query('q', '');
        if (!empty($q)) {
            $pagingQuery = $pagingQuery->where(function ($query) use ($q) {
                $query->where('IdMember', 'LIKE', "%$q%")
                    ->orWhere('NameMember', 'LIKE', "%$q%")
                    ->orWhere(DB::raw("CONCAT(IdMember,' ',NameMember)"), 'LIKE', "%$q%");            
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
            return BaseResult::whithdata($pagingData);
        }           
    }
    
  
}
