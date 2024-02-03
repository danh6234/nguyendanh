<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportModel extends Model
{
    use HasFactory;
    protected $table = 'Reports';
    protected $primaryKey='ID';
    protected $fillable = [
        'Name',
        'Description',
    ];
}