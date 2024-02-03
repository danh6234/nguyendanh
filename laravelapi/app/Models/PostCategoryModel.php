<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class PostCategoryModel extends Model
{
   
    protected $table='PostCategory';
    protected $primaryKey='ID';

    public $timestamps = false;
}
