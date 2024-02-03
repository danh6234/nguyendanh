<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users') -> insert([
            ['name'=>'web admin',
             'email'=>'danh3@gmail.com',
             'username'=>'admin3',
             'password'=>bcrypt('123456789')],  
             
        ]);
    }
}
