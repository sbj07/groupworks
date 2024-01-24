package com.groupworks.app.company.controller;

import com.groupworks.app.company.service.CompanyService;
import com.groupworks.app.company.vo.CompanyVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/company")
@RequiredArgsConstructor
public class CompanyApiController {
    private final CompanyService service;

    // 회사추가
    @PostMapping
    public Map<String, String> insertCompany(@RequestBody CompanyVo vo) {
        String result = service.insertCompany(vo);
        Map<String, String> map = new HashMap<String, String>();
        map.put("msg","okay");
        map.put("companyNo", result);
        if(result == null) {
            map.put("msg", "nope");
        }
        return map;
    }

}
