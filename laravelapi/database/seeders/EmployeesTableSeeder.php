<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmployeesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees=[
            ['username'=>'Danh1','password'=>'123456789','lastname'=>'Danh', 'firstname'=>'Nguyen',
            'email'=>'danh@gmail.com', 'phone'=>'0399597551'],         
        ];
        DB::table('employees')->insert($employees);

    }
}
