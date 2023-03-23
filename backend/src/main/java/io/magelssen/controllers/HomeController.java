package io.magelssen.controllers;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import java.io.InputStream;

@Controller
public class HomeController {

    @Get("/")
    public HttpResponse<InputStream> serveReactApp() {
        InputStream inputStream = getClass().getResourceAsStream("/static/index.html");

        if (inputStream != null) {
            return HttpResponse.ok(inputStream)
                .contentType(MediaType.TEXT_HTML_TYPE);
        } else {
            return HttpResponse.notFound();
        }
    }

    @Get("/main.js")
    public HttpResponse<InputStream> serveJs() {
        InputStream input = getClass().getResourceAsStream("/static/main.js");
        if (input != null) {
            return HttpResponse.ok(input);
        } else {
            return HttpResponse.notFound();
        }
    }

    @Get("/{path:.*}")
    public HttpResponse<InputStream> serveReactApp(@PathVariable String path) {
            InputStream inputStream = getClass().getResourceAsStream("/static/index.html");
        if (inputStream != null) {
            return HttpResponse.ok(inputStream)
                    .contentType(MediaType.TEXT_HTML_TYPE);
        } else {
            return HttpResponse.notFound();
        }
    }

    @Get("/test")
    public HttpResponse<String> helloWorld() {
        return HttpResponse.ok("{\"Result\": \"Success\", \"Message\": \"Hello, world!\"}\r\n");
    }
}
