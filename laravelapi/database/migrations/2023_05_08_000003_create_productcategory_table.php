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
        Schema::create('ProductCategory', function (Blueprint $table) {
            $table->increments('ID');
            $table->integer('ProductCategoryID')->nullable();
            $table->string('Name')->nullable();
            $table->string('Description')->nullable();
            $table->integer('DisplayOrder')->nullable();
            $table->string('Image')->nullable();
            $table->dateTime('CreatedDate')->nullable();
            $table->string('CreatedBy')->nullable();
            $table->string('MetaDescription')->nullable();
            $table->integer('Status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ProductCategory');
    }
};
