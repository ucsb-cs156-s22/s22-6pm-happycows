package edu.ucsb.cs156.happiercows.models;

import java.util.Collection;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.security.core.GrantedAuthority;

import edu.ucsb.cs156.happiercows.entities.User;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class CreateCommonsParams
{
  private String name;
  private String cowPrice;
  private String milkPrice;
  private String startingBalance;
  private String year;
  private String month;
  private String day;
  private String hour;
  private String minute;
  private String second;
}
