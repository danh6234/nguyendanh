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
        Schema::create('CartItem', function (Blueprint $table) {
            $table->id();
            $table->string('NameProduct', 255);
            $table->string('IdProduct', 255);
            $table->string('QualityProduct', 255);
            $table->integer('Status');
            $table->integer('IdMember');
            $table->string('NameMember', 255);
            $table->integer('TotalPrice');
            $table->integer('TransPort');
            $table->integer('PriceSale');
            $table->integer('TotalPay');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('CartItem');
    }
};
