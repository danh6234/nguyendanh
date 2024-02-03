<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Employee extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $primaryKey='emp_id';
    protected $guard = 'employee';
    protected $table = 'employees';
    protected $hidden = [
        'password' , 'remeber_token'
    ];
}
