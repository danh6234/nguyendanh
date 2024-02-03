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
        Schema::create('saveinfor', function (Blueprint $table) {
            $table->id();
            $table->string('IdProduct', 100);
            $table->string('Name', 100);
            $table->string('Price', 100);
            $table->string('ImageUrl', 255)->nullable();
            $table->integer('Quantity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saveinfor');
    }
};
