package com.example.project.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FunRestController {

    @GetMapping("/")
    public String getLogin(){
        return "Tu się będziesz logował";
    }
    @GetMapping("/registration")
    public String getRegistration(){
        return "Tu się będziesz rejestrował";
    }

    @GetMapping("/home")
    public String getHome(){
        return "home";
    }

    @GetMapping("/plans")
    public String getPlans(){
        return "plans";
    }

    @GetMapping("/activities")
    public String getSctivitis(){
        return "activities";
    }

    @GetMapping("/progress")
    public String getProgress(){
        return "progress";
    }

    @GetMapping("/")
    public String sayHello(){
        return "Tu się będziesz logował";
    }



}