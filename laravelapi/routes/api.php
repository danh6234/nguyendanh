<?php

use App\Http\Controllers\CartItemController;
use App\Http\Controllers\CodeforAllController;
use App\Http\Controllers\DownloadImgController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\getImageController;
use App\Http\Controllers\GetPagingController;
use App\Http\Controllers\MemberGetImageController;
use App\Http\Controllers\MemberRegisterController;
use App\Http\Controllers\MembersController;
use App\Http\Controllers\OderController;
use App\Http\Controllers\OderDetailController;
use App\Http\Controllers\PostCategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductPriceController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\SaveInforController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//Check quyền
Route::get('login', function(){
    $response= ['errorCode'=>401, "message"=>" Unauthenticated"];
    return response()->json($response,401);
})->name('login')
;
//PHÂN TRANG
    Route::get('/product/get-paging', [GetPagingController::class, 'getPagingProduct']);
    Route::get('/productcategory/get-paging', [GetPagingController::class, 'getPagingProductCategory']);
    Route::get('/employees/get-paging', [GetPagingController::class, 'getPagingEmployee']);
    Route::get('/member/get-paging', [GetPagingController::class, 'getPagingMember']);
    Route::get('/report/get-paging', [GetPagingController::class, 'getPagingReport']);
    Route::get('/employees/cartitem/get-paging', [GetPagingController::class, 'getPagingCartitem']);
    
//User = chủ cửa hàng.
    //đăng nhập
Route::post('/login', [UsersController::class, 'login']);
    //Chức năng 
Route::group(['middleware'=>'auth:api'],function (){
        //SẢN PHẨM 
            //Loại sản phẩm
            Route::get('/productcategory/{id?}',[ProductCategoryController::class, 'index']);
            Route::post('/productcategory',[ProductCategoryController::class, 'create']);
            Route::put('/productcategory/{id}',[ProductCategoryController::class,'update']);
            Route::delete('/productcategory/{id}',[ProductCategoryController::class, 'delete']);
            //quản lý sản phẩm
            Route::get('/product/download-img/{id}',[DownloadImgController::class, 'downloaddImgProduct']);
            Route::get('/product/avatar-url/{id}',[getImageController::class, 'index']);
            
            Route::get('/product/{id?}',[ProductController::class, 'index']);
            Route::post('/product',[ProductController::class, 'create']);
            Route::post('/product/{id}',[ProductController::class,'update']);
            Route::delete('/product/{id}',[ProductController::class, 'delete']);
            //Gía sản phẩm
            Route::get('/productprice/{id?}',[ProductPriceController::class, 'index']);
            Route::post('/productprice',[ProductPriceController::class, 'create']);
            Route::put('/productprice/{id}',[ProductPriceController::class,'update']);
            Route::delete('/productprice/{id}',[ProductPriceController::class, 'delete']);
        //quản lý nhân viên
        Route::get('/users/employees/avatar-url/{id}',[getImageController::class, 'getImgEmploy']);

        Route::get('/users/employees/{id?}',[UsersController::class, 'indexEmploy']);
        Route::post('/users/employees',[UsersController::class, 'createEmploy']);
        Route::post('/users/employees/{id}',[UsersController::class,'updateEmploy']);
        Route::delete('/users/employees/{id}',[UsersController::class, 'deleteEmploy']);
        //quản lý khách hàng
        Route::get('/users/member/avatar-url/{id}',[getImageController::class, 'getImgMembers']);

        Route::get('/users/member/{id?}',[UsersController::class, 'indexMember']);
        Route::post('/users/member',[UsersController::class,'createMember']);
        Route::post('/users/member/{id}',[UsersController::class,'updateMember']);
        Route::delete('/users/member/{id}',[UsersController::class, 'deleteMember']);
        //xem báo cáo
        Route::get('/users/report/download-img/{id}',[DownloadImgController::class, 'downloaddImgReport']);

        Route::get('/users/report/{id?}',[UsersController::class, 'indexReport']);
        Route::delete('/users/report/{id}',[UsersController::class, 'deleteReport']);
        //Thao tác bài viết
        Route::get('/post/{id?}',[PostController::class, 'index']);
        Route::post('/post',[PostController::class, 'create']);
        Route::post('/post/{id}',[PostController::class,'update']);
        Route::delete('/post/{id}',[PostController::class, 'delete']);
        // Quản lý Code giảm giá
        Route::get('/code/{IdCode?}',[CodeforAllController::class, 'index']);
        Route::post('/code',[CodeforAllController::class,'create']);
        Route::post('/code/{id}',[CodeforAllController::class,'update']);
        Route::delete('/code/{id}',[CodeforAllController::class, 'delete']);

        //Quản lý doanh thu
        Route::get('/users/Oderdetail/{id?}',[UsersController::class, 'indexOderdetail']);
        Route::delete('/users/Oderdetail/clear',[UsersController::class, 'clearOrderDetail']);
        Route::get('/users/Oder/{id?}',[UsersController::class, 'indexOder']);
        Route::delete('/users/Oder/clear',[UsersController::class, 'clearOrder']);

    
});

// Member = khách hàng
    //đăng ký, đăng nhập
Route::post('/member/register',[MemberRegisterController::class, 'register'])
;
Route::post('/member/login',[MembersController::class, 'login'])
;

Route::group(['prefix'=>'member','middleware'=>'auth:sanctum','auth:api'],function (){
    //quản lý thông tin cá nhân
    Route::post('/{id}',[MembersController::class,'update']);
    Route::get('/profile', [MembersController::class , 'profile']);

    //mua, quản lý giỏ hàng
        //thông tin sản phẩm
        Route::get('/product/avatar-url/{id}',[MemberGetImageController::class, 'index']);
        Route::get('/product/{id?}',[MembersController::class, 'index']);
        Route::get('/productcategory/{id?}',[MembersController::class, 'getPagingProductCtegory']);
        //lấy code
        Route::get('/code/{id?}',[MembersController::class, 'indexCodeAll']);
        //thông tin chọn sản phẩm
        Route::get('/saveinfor/create/{IDMember?}',[SaveInforController::class, 'index']);
        Route::post('/saveinfor/create',[SaveInforController::class, 'create']);
        Route::delete('/saveinfor/create/{id}',[SaveInforController::class, 'delete']);
        Route::delete('/saveinfor/create/deleteall/{idMember}',[SaveInforController::class, 'clear']);
        //giỏ hàng
        Route::get('/cartitem/create/{id?}',[CartItemController::class, 'index']);
        Route::post('/cartitem/create',[CartItemController::class, 'create']);
        Route::get('/cartitem/get/{idMember?}',[MembersController::class, 'indexCartItem']);   
});

//Employees = nhân viên 
    //đăng nhập
Route::post('/employees/login',[EmployeesController::class, 'login']);

Route::group(['middleware'=>'auth:sanctum'],function (){
    Route::post('employees/{id}',[EmployeesController::class,'update']);
    Route::get('employees/profile', [EmployeesController::class , 'profile']);
   
    //Chức năng nhân viên
        //Xử lý đơn hàng
        Route::get('employees/cartitem/oder/{idMember?}',[EmployeesController::class, 'indexCartItemOder']);   
        Route::get('/employees/cartitem/{id?}',[EmployeesController::class, 'indexCartItem']);
        Route::post('/employees/cartitem/{id}',[EmployeesController::class, 'updateCartItem']);
        Route::delete('/employees/cartitem/{id}',[EmployeesController::class, 'deleteCartItem']);
       
        //Chức năng đơn hàng
        Route::get('employees/oder/create/{id?}',[OderController::class, 'index']);
        Route::post('employees/oder/create',[OderController::class, 'create']);
             
        //Chức năng với chi tiết hóa đơn
        Route::get('employees/oderdetail/create/{id?}',[OderDetailController::class, 'index']);
        Route::post('employees/oderdetail/create',[OderDetailController::class, 'create']);
        
        // //Bài Viết
        //     //Loại bài viết
        //     Route::get('employees/postCategory/{id?}',[PostCategoryController::class, 'index']);
        //     Route::post('employees/postCategory',[PostCategoryController::class, 'create']);
        //     Route::put('employees/PostCategory/{id}',[PostCategoryController::class,'update']);
        //     Route::delete('employees/postCategory/{id}',[PostCategoryController::class, 'delete']);
        //     //Thao tác bài viết
        //     Route::get('employees/post/{id?}',[PostController::class, 'index']);
        //     Route::post('employees/post',[PostController::class, 'create']);
        //     Route::put('employees/post/{id}',[PostController::class,'update']);
        //     Route::delete('employees/post/{id}',[PostController::class, 'delete']);
        
        //Báo cáo
         Route::get('employees/reportem/report/{id?}',[ReportsController::class, 'index']);
         Route::post('employees/reportem/report',[ReportsController::class, 'create']);
         Route::post('employees/reportem/report/{id}',[ReportsController::class,'update']);
         Route::delete('employees/reportem/report/{id}',[ReportsController::class,'delete']);
         Route::get('employees/reportem/getPagingReportEmpid/{id}',[ReportsController::class,'getPagingReportEmpid']);
});
    

