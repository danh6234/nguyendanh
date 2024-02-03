<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductModel extends Model
{
    use HasFactory;
    protected $table = 'Product';
    protected $primaryKey='ID';
    protected $fillable = [
        'Name',
        'ImageUrl',
        'Description',
        'Price',
        'ProductCategoryID',
    ];

    public function Category()
    {
        return $this->belongsTo(ProductCategoryModel::class, 'ProductCategoryID');
    }

}
