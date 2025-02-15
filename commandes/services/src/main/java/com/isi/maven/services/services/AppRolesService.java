package com.isi.maven.services.services;

import com.isi.maven.services.dao.IAppRolesRepository;
import com.isi.maven.services.dto.AppRoles;
import com.isi.maven.services.exception.EntityExistsException;
import com.isi.maven.services.exception.EntityNotFoundException;
import com.isi.maven.services.exception.RequestException;
import com.isi.maven.services.mapping.AppRolesMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class AppRolesService {

    private final IAppRolesRepository iAppRolesRepository;

    private final AppRolesMapper appRolesMapper;

    private final MessageSource messageSource;

    @Transactional(readOnly = true)
    public List<AppRoles> getAppRoles() {
        return StreamSupport.stream(iAppRolesRepository.findAll().spliterator(), false)
                .map(appRolesMapper::toAppRoles)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AppRoles getAppRole(int id) {
        return appRolesMapper.toAppRoles(iAppRolesRepository.findById(id)
                .orElseThrow(() ->
                new EntityNotFoundException(messageSource.getMessage("role.notfound", new Object[]{id},
                        Locale.getDefault()))));
    }

    @Transactional
    public AppRoles createAppRoles(AppRoles appRoles) {
        if (iAppRolesRepository.findByNom(appRoles.getNom()).isPresent()) {
            throw new EntityExistsException(
                    messageSource.getMessage("role.exists",
                            new Object[]{appRoles.getNom()},
                            Locale.getDefault())
            );
        }
        return appRolesMapper.toAppRoles(iAppRolesRepository.save(appRolesMapper.fromAppRoles(appRoles)));
    }

    @Transactional
    public AppRoles updateAppRoles(int id, AppRoles appRoles) {
        return iAppRolesRepository.findById(id)
                .map(entity -> {
                    appRoles.setId(id);
                    return appRolesMapper.toAppRoles(
                            iAppRolesRepository.save(appRolesMapper.fromAppRoles(appRoles)));
                }).orElseThrow(() -> new EntityNotFoundException(messageSource.getMessage("role.notfound", new Object[]{id},
                        Locale.getDefault())));
    }

    @Transactional
    public void deleteAppRoles(int id) {
        getAppRole(id);
        try {
            iAppRolesRepository.deleteById(id);
        } catch (Exception e) {
            throw new RequestException(messageSource.getMessage("role.errordeletion", new Object[]{id},
                    Locale.getDefault()),
                    HttpStatus.CONFLICT);
        }
    }
}
