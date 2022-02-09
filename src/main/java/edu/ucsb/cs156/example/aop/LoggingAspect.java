package edu.ucsb.cs156.example.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Slf4j
@Aspect
@Component
public class LoggingAspect {
  //language=PointcutExpression
  private static final String pointcut = """
    @annotation(org.springframework.web.bind.annotation.RequestMapping) ||
    @annotation(org.springframework.web.bind.annotation.GetMapping) ||
    @annotation(org.springframework.web.bind.annotation.PostMapping) ||
    @annotation(org.springframework.web.bind.annotation.PutMapping) ||
    @annotation(org.springframework.web.bind.annotation.DeleteMapping) ||
    @annotation(org.springframework.web.bind.annotation.PatchMapping)
    """;

  @Before(pointcut)
  public void logControllers(JoinPoint joinPoint) {
    getCurrentHttpRequest().ifPresent(
      request -> log.info(
        "===== %s %s handled by %s in %s".formatted(
          request.getMethod(),
          request.getRequestURI(),
          joinPoint.getSignature().getName(),
          joinPoint.getSignature().getDeclaringTypeName()
        )
      )
    );
  }

  private static Optional<HttpServletRequest> getCurrentHttpRequest() {
    return Optional.ofNullable(RequestContextHolder.getRequestAttributes())
      .filter(ServletRequestAttributes.class::isInstance)
      .map(ServletRequestAttributes.class::cast)
      .map(ServletRequestAttributes::getRequest);
  }
}
