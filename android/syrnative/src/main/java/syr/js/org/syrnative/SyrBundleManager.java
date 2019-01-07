package syr.js.org.syrnative;

import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.lang.ref.WeakReference;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Syr Project
 * https://syr.js.org
 * Created by Derek Anderson on 1/8/18.
 */
public class SyrBundleManager {
    protected String uri;
    protected Context context;

    public SyrBundleManager(Context mContext) {
        // does this need the (additional) config param?
        // if not do we need this constructor?
        context = mContext;
    }

    public SyrBundleManager setBundleAssetName(String uri) {
        this.uri = uri;
        return this;
    }

    public SyrBundle build() {
        this.getManifest();
        return new SyrBundle(this);
    }

    public void getManifest() {
        new GetManifestTask(context).execute("http://10.0.2.2:8000/appstack/nxo-syr-app/stage/testfixture");
    }

    private class GetManifestTask extends AsyncTask<String, String, String> {
        private WeakReference<Context> contextRef;

        public GetManifestTask(Context mContext) {
            // does this need the (additional) config param?
            // if not do we need this constructor?
            contextRef = new WeakReference<>(mContext);
        }

        protected String doInBackground(String... params) {

            HttpURLConnection connection = null;
            BufferedReader reader = null;

            try {
                URL url = new URL(params[0]);
                connection = (HttpURLConnection) url.openConnection();
                connection.connect();

                InputStream stream = connection.getInputStream();

                reader = new BufferedReader(new InputStreamReader(stream));

                StringBuffer buffer = new StringBuffer();
                String line = "";

                while ((line = reader.readLine()) != null) {
                    buffer.append(line+"\n");
                    Log.d("Response: ", "> " + line);
                }

                return buffer.toString();

            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (connection != null) {
                    connection.disconnect();
                }
                try {
                    if (reader != null) {
                        reader.close();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return null;
        }

        @Override
        protected void onPostExecute(String result) {

            try {
                JSONObject jsonObject = new JSONObject(result);
                JSONObject manifestObject = jsonObject.getJSONObject("app");
                String manifestHash = manifestObject.getString("hash");
                JSONArray arrJson = manifestObject.getJSONArray("files");

                for(int i = 0; i < arrJson.length(); i++) {
                    JSONObject fileObject = arrJson.getJSONObject(i);
                    String fileName = fileObject.getString("name");
                    String fileHash = fileObject.getString("hash");
                    String fileType = fileObject.getString("type");

                    if(fileType.equals("script")) {
                        // we are only dealing with script updates currently
                        new GetFiles(context).execute("");
                    }
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }

        }
    }

    private class GetFiles extends AsyncTask<String, String, String> {

        private WeakReference<Context> contextRef;
        public GetFiles(Context mContext) {
            // does this need the (additional) config param?
            // if not do we need this constructor?
            contextRef = new WeakReference<>(mContext);
        }

        protected String doInBackground(String... params) {
            try {
                this.saveTextFileFromURL("https://www.paypalobjects.com/appstack/nativexo/testfixture/testfile.js");
            } catch (IOException e) {
                e.printStackTrace();
            } catch (JSONException e) {
                e.printStackTrace();
            }

            return params[0];
        }
        public void saveTextFileFromURL(String urlString) throws IOException, JSONException {

            HttpURLConnection urlConnection = null;

            URL url = new URL(urlString);

            urlConnection = (HttpURLConnection) url.openConnection();

            urlConnection.setRequestMethod("GET");
            urlConnection.setReadTimeout(10000 /* milliseconds */);
            urlConnection.setConnectTimeout(15000 /* milliseconds */);


            urlConnection.setDoOutput(true);

            urlConnection.connect();

            BufferedReader br=new BufferedReader(new InputStreamReader(url.openStream()));

            char[] buffer = new char[1024];

            String string = new String();

            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line+"\n");
            }

            File file = new File(context.getCacheDir(), "testfile.txt");
            FileWriter fw = new FileWriter(file.getAbsoluteFile());
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(br.toString());
            bw.close();
            br.close();
        }
    }


}
