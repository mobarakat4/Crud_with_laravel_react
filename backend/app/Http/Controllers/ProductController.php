<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::select(['id','title','description','image']);

        return response()->json([

            'products ' => $products
        ],200);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'=>'required|string',
            'description' => 'required|string',
            'image' => 'required"image'
        ]);
        $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
        Storage::disk('public')->putFileAs('img/products/', $request->image , $imageName);
        Product::create($request->post() + ['image'=>$imageName]);
        return response()->json([
            'message' => 'product added successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json([
            'product'=> $product,
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'title'=>'required|string',
            'description' => 'required|string',
            'image' => 'nullable'
        ]);
        $product->fill($request->post())->update();
        if( $request->hasFile('image')){
            $exist = Storage::disk('public')->exists('img/products/'.$product->image);
            if(!$exist){
               Storage::disk('public')->delete('img/products/'.$product->image);

            }
            $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('img/products/', $request->image , $imageName);
            $product->image = $imageName;
            $product->save();

        }

        return response()->json([
            'message' => 'product updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if( $product->image){
            $exist = Storage::disk('public')->exists('img/products/'.$product->image);
            if(!$exist){
               Storage::disk('public')->delete('img/products/'.$product->image);
            }

        }
        $product->delete();
        return response()->json([
            'message' => 'product deleted'
        ]);
    }
}
