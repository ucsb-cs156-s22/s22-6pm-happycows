package edu.ucsb.cs156.happiercows.models;

import java.time.LocalDateTime;
import java.util.Collection;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.format.annotation.NumberFormat;
import org.springframework.format.annotation.DateTimeFormat;

import org.springframework.security.core.GrantedAuthority;

import edu.ucsb.cs156.happiercows.entities.User;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class CreateCommonsParams {
  private String name;
  @NumberFormat private double cowPrice;
  @NumberFormat private double milkPrice;
  @NumberFormat private double startingBalance;
  @DateTimeFormat private LocalDateTime startingDate;
  @DateTimeFormat private LocalDateTime endDate;
  private Boolean showLeaderboard; // NOTE: WHY DOES BOOLEAN HAVE TO BE CAPITALIZED HERE OMG THE AMOUNT OF GRIEF
                                   // THIS GAVE ME-KZ

