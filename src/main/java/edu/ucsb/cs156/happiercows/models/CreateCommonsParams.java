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
public class CreateCommonsParams
{
  private String name;
  @NumberFormat private Double cowPrice;
  @NumberFormat private Double milkPrice;
  @NumberFormat private Double startingBalance;
  @DateTimeFormat private LocalDateTime startingDate;
}
