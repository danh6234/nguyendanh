<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OderModel extends Model
{
    use HasFactory;
    
    protected $table = 'Oder';
    protected $primaryKey='ID';
    protected $fillable = [
        'Fullname',
        'Address',
        'Email',
        'Tel',
    ];

    public function Employee()
    {
        return $this->belongsTo(Employee::class, 'emp_id');
    }

    public function Member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }
}
