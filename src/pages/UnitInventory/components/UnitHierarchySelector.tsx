import React from 'react';
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Divider,
} from '@mui/material';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { UnitHierarchy } from '../types';

interface UnitHierarchySelectorProps {
  currentUnit: string[];
  onUnitSelect: (unitPath: string[]) => void;
  unitHierarchy: UnitHierarchy;
}

const getLevelColor = () => {
  return '#2196F3'; // Default color
};

const renderTree = (
  node: UnitHierarchy,
  onSelect: (path: string[]) => void,
  currentPath: string[] = []
) => (
  <TreeItem
    key={node.id}
    itemId={node.id}
    label={
      <Typography
        variant="body2"
        sx={{
          color: getLevelColor(),
          fontWeight: node.level === 'company' ? 600 : 400,
        }}
      >
        {node.name}
      </Typography>
    }
    onClick={() => onSelect([...currentPath, node.name])}
  >
    {Array.isArray(node.children)
      ? node.children.map((child) => renderTree(child, onSelect, [...currentPath, node.name]))
      : null}
  </TreeItem>
);

const UnitHierarchySelector: React.FC<UnitHierarchySelectorProps> = ({
  currentUnit,
  onUnitSelect,
  unitHierarchy,
}) => {
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Breadcrumbs separator="›" aria-label="unit hierarchy breadcrumb">
          {currentUnit.map((unit, index) => {
            const isLast = index === currentUnit.length - 1;
            return isLast ? (
              <Typography
                key={unit}
                color="text.primary"
                sx={{ fontWeight: 600 }}
              >
                {unit}
              </Typography>
            ) : (
              <Link
                key={unit}
                component="button"
                variant="body1"
                onClick={() => onUnitSelect(currentUnit.slice(0, index + 1))}
                color="inherit"
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {unit}
              </Link>
            );
          })}
        </Breadcrumbs>
      </Box>
      <Divider sx={{ my: 2 }} />
      <TreeView
        slots={{
          expandIcon: ChevronRightIcon,
          collapseIcon: ExpandMoreIcon,
        }}
        defaultExpandedItems={['cco']}
        sx={{
          flexGrow: 1,
          maxHeight: 400,
          overflowY: 'auto',
          '& .MuiTreeItem-root': {
            '& .MuiTreeItem-content': {
              py: 1,
            },
          },
        }}
      >
        {renderTree(unitHierarchy, onUnitSelect)}
      </TreeView>
    </Box>
  );
};

export default UnitHierarchySelector; 