<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostModel extends Model
{
    use HasFactory;
    protected $table = 'Post';
    protected $primaryKey='id';
    protected $fillable = [
        'Name',
        'Image',
        'CategoryID',
    ];

    public function Category()
    {
        return $this->belongsTo(PostCategoryModel::class, 'CategoryID');
    }
}
