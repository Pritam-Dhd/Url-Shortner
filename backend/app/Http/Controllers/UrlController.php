<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UrlController extends Controller
{
    public function addUrl(Request $request)
    {
        $originalUrl = $request->input('originalUrl');
        $shortUrl = $request->input('shortUrl');

        // Check if the URL already exists in the database
        $existingUrl = DB::table('urls')->where('originalUrl', $originalUrl)->first();
        if ($existingUrl) {
            return response()->json(['message' => 'URL already exists'], 200);
        }

        try {
            $data = DB::table('urls')->insert([
                'originalUrl' => $originalUrl,
                'shortUrl' => $shortUrl
            ]);

            if ($data) {
                return response()->json(['message' => 'Data added successfully']);
            } else {
                return response()->json(['message' => 'Data is not added'], 500);
            }
        } catch (Exception $e) {
            return response()->json(['message' => 'Data is not added'], 500);
        }
    }

    function getUrl()
    {
        return DB::table('urls')->get();
    }
    function deleteUrl(Request $request)
    {
        try{
            $id = $request->input('id');
            $data=DB::table('urls')->where('id',$id)->delete();
            if ($data > 0) {
                return response()->json(['message' => 'Data deleted successfully']);
            } else {
                return response()->json(['message' => 'Data is not deleted']);
            }
        }
        catch(Exception $e){
            return response()->json(['message' => 'Error in query']);
        }
    }
}
