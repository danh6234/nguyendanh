<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuModel extends Model
{
    use HasFactory;
    protected $table = 'Menu';
    protected $primaryKey='id';
    protected $fillable = [
        'Name',
        'Page',
        'Url',
        'TypeMenu',
        'ProductID',
        'ProductCategoryID',
    ];

    public function Product()
    {
        return $this->belongsTo(ProductModel::class, 'ProductID');
    }

    public function ProductCategory()
    {
        return $this->belongsTo(ProductCategoryModel::class, 'ProductCategoryID');
    }
}
