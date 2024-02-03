<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductPriceModel extends Model
{
    use HasFactory;
    protected $table = 'ProductPrice';
    protected $primaryKey='ID';
    protected $fillable = [
        'Price',
        'Date',
        'ProductID',
    ];

    public function product()
    {
        return $this->belongsTo(ProductModel::class, 'ProductID');
    }
}
