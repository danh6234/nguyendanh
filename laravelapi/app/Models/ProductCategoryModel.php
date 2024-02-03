<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class ProductCategoryModel extends Model
{
    protected $table='ProductCategory';
    protected $primaryKey='ID';

    public $timestamps = false;
}
