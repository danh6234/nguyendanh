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
        Schema::create('OderDetail', function (Blueprint $table) {
            $table->id();
            $table->string('OderID')->nullable();
            $table->string('ProductID')->nullable();
            $table->string('Quantity')->nullable();
            $table->decimal('Price', 18, 0)->nullable();
            $table->decimal('TransPort', 18, 0)->nullable();
            $table->decimal('Sale', 18, 0)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('OderDetail');
    }
};
