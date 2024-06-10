import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase,Collapse } from '@mui/material';
import React from 'react';
import { items } from './config';


export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, title, path, subitems,pathname } = props;
  const linkProps = path
    ? external
      ? {
          component: 'a',
          href: path,
          target: '_blank',
        }
      : {
          component: NextLink,
          href: path,
        }
    : {};

    const [isOpen, setIsOpen] = React.useState(false);


  

  return (
    <li>
      <ButtonBase 
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          },
        }}
        onClick={subitems ? handleToggle : undefined}  // Allow toggle only if there are subitems
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'neutral.400',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'primary.main',
              }),
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'common.white',
            }),
            ...(disabled && {
              color: 'neutral.500',
            }),
          }}
        >
          {title}
        </Box>
      </ButtonBase>
      {subitems && subitems.length > 0 && (
        <Collapse in={isOpen}>
          <ul>
            {subitems.map((subitem) => (
              <SideNavItem
              key={subitem.title}
              active={pathname === subitem.path}
              disabled={subitem.disabled}
              external={subitem.external}
              icon={subitem.icon}
              title={subitem.title}
              path={subitem.path}
              subitems={subitem.subitems}
              pathname={pathname} // Pass down pathname prop
              isOpen={isOpen} // Pass down isOpen state
            />
            ))}
          </ul>
        </Collapse>
      )}
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
  subitems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string,
      disabled: PropTypes.bool,
      external: PropTypes.bool,
      icon: PropTypes.node,
    })
  ),
  pathname: PropTypes.string, // Add pathname prop type
};