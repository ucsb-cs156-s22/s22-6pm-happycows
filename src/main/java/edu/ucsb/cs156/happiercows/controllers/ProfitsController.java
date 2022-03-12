package edu.ucsb.cs156.happiercows.controllers;

import edu.ucsb.cs156.happiercows.errors.EntityNotFoundException;
import edu.ucsb.cs156.happiercows.models.CurrentUser;
import edu.ucsb.cs156.happiercows.entities.Profit;
import edu.ucsb.cs156.happiercows.entities.Commons;
import edu.ucsb.cs156.happiercows.entities.User;
import edu.ucsb.cs156.happiercows.entities.UserCommons;
import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;
import edu.ucsb.cs156.happiercows.repositories.ProfitRepository;
import edu.ucsb.cs156.happiercows.repositories.UserCommonsRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import lombok.extern.slf4j.Slf4j;

import javax.validation.Valid;
import java.util.Optional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api(description = "Profits")
@RequestMapping("/api/profits")
@RestController
@Slf4j

public class ProfitsController extends ApiController {

    @Autowired
    CommonsRepository commonsRepository;

    @Autowired
    UserCommonsRepository userCommonsRepository;

    @Autowired
    ProfitRepository profitRepository;

    @ApiOperation(value = "Get a single profit for user")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("")
    public Profit getProfitById(
            @ApiParam("id") @RequestParam Long id) {
        Long userId = getCurrentUser().getUser().getId();

        Profit profit = profitRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(Profit.class, id));
        if (userId != profit.getUserCommons().getUserId())
            throw new EntityNotFoundException(Profit.class, id);
        return profit;
    }

    @ApiOperation(value = "Get a single profit for admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin")
    public Profit getProfitById_admin(
            @ApiParam("id") @RequestParam Long id) {
        Profit profit = profitRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(Profit.class, id));
        return profit;
    }

    @ApiOperation(value = "List all profits")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/all")
    public Iterable<Profit> allUsersProfits() {
        Iterable<Profit> profits = profitRepository.findAll();
        return profits;
    }

    @ApiOperation(value = "Get all profits belonging to a user commons as a user")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/all/commons")
    public Iterable<Profit> allProfitsByUserCommonsId(
            @ApiParam("userCommonsId") @RequestParam Long userCommonsId) {
        Long userId = getCurrentUser().getUser().getId();

        UserCommons userCommons = userCommonsRepository.findById(userCommonsId).orElseThrow(() -> new EntityNotFoundException(UserCommons.class, userCommonsId));

        if (userId != userCommons.getUserId())
            throw new EntityNotFoundException(UserCommons.class, userCommonsId);

        Iterable<Profit> profits = profitRepository.findAllByUserCommonsId(userCommonsId);

        return profits;
    }

    @ApiOperation(value = "Get all profits belonging to a user commons as an admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/all/commons")
    public Iterable<Profit> allProfitsByUserCommonsId_admin(
            @ApiParam("userCommonsId") @RequestParam Long userCommonsId) {
        Iterable<Profit> profits = profitRepository.findAllByUserCommonsId(userCommonsId);
        return profits;
    }

    @ApiOperation(value = "Create a new Profit as admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/admin/post")
    public Profit postProfit_admin(
            @ApiParam("profit") @RequestParam long profit,
            @ApiParam("timestamp") @RequestParam long timestamp,
            @ApiParam("userCommonsId") @RequestParam long userCommonsId) {
        UserCommons userCommons = userCommonsRepository.findById(userCommonsId).orElseThrow(() -> new EntityNotFoundException(UserCommons.class, userCommonsId));

        Profit createdProfit = new Profit();
        createdProfit.setProfit(profit);
        createdProfit.setUserCommons(userCommons);
        createdProfit.setTimestamp(timestamp);
        Profit savedProfit = profitRepository.save(createdProfit);
        return savedProfit;
    }


    @ApiOperation(value = "Delete other user profit as admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/admin")
    public Object deleteProfit_Admin(
            @ApiParam("id") @RequestParam Long id) {
        Profit profit = profitRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(Profit.class, id));

        profitRepository.delete(profit);

        return genericMessage("Profit with id %s deleted".formatted(id));
    }

    @ApiOperation(value = "Update a single profit as admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/admin")
    public Profit putProfitById_admin(
            @ApiParam("id") @RequestParam Long id,
            @RequestBody @Valid Profit newProfit) {
        Profit profit = profitRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(Profit.class, id));

        profit.setProfit(newProfit.getProfit());
        profit.setTimestamp(newProfit.getTimestamp());

        profitRepository.save(profit);

        return profit;
    }
}