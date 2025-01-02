const UploadGuide = () => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>Dosya Yükleme Kılavuzu</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <List>
        <ListItem>
          <ListItemIcon><CheckCircleIcon /></ListItemIcon>
          <ListItemText 
            primary="Desteklenen Formatlar" 
            secondary="Gerber, Excellon, ODB++, ZIP" 
          />
        </ListItem>
        {/* Diğer kılavuz maddeleri */}
      </List>
    </AccordionDetails>
  </Accordion>
) 