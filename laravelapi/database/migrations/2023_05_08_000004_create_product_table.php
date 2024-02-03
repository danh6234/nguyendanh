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
        Schema::create('Product', function (Blueprint $table) {
            $table->increments('ID');
            $table->integer('ProductID')->nullable();
            $table->string('Name')->nullable();
            $table->string('ProductCode')->nullable();
            $table->string('ImageUrl')->nullable();
            $table->string('Description')->nullable();
            $table->integer('ProductType')->nullable();
            $table->decimal('Price', 18, 0)->nullable();
            $table->decimal('PriceSale', 18, 0)->nullable();
            $table->string('Color')->nullable();
            $table->string('Manufacture')->nullable();
            $table->string('Madeln')->nullable();
            $table->dateTime('CreatedDate')->nullable();
            $table->integer('Status')->nullable();
            $table->integer('ProductCategoryID')->unsigned()->nullable();
            $table->foreign('ProductCategoryID')->references('ID')->on('ProductCategory')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Product');
    }
};
