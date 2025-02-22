package com.revature.cachemoney.backend.beans.controllers;

import com.revature.cachemoney.backend.beans.annotations.RequireJwt;
import com.revature.cachemoney.backend.beans.models.Notification;
import com.revature.cachemoney.backend.beans.models.User;
import com.revature.cachemoney.backend.beans.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {
    NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/all")
    List<Notification> findAll() {
        return notificationService.findAll();
    }

    @GetMapping("/unread/{user_id}")
    List<Notification> findAllUnread(@RequestBody User user) {
        return notificationService.findAllByUnread(user);
    }

    @PostMapping("/add")
    Notification save(@RequestBody Notification notification) {
        return notificationService.saveNotification(notification);
    }

    @PutMapping("/update")
    void updateNotifications(@RequestBody User user) {
        notificationService.updateNotifications(user);
    }
}
