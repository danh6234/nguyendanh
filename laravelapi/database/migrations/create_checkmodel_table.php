<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('CheckModel', function (Blueprint $table) {
            $table->increments('id');
            $table->text('FullName')->nullable();
            $table->text('Email')->nullable();
            $table->text('Phone')->nullable();
            $table->text('Address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('CheckModel');
    }
};
